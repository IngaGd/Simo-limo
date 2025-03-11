const { sheets, PRODUCT_LIST_ID } = require("../utils/googleSheets");
const axios = require("axios");
// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(process.env.SENDGRID_KEY);

exports.getPaymentStatus = async (req, res) => {
  console.log("Call check-session, cookie: ", req.cookies.session);
  const sessionId = req.cookies.session;
  if (!sessionId) {
    return res.status(400).json({ message: "Session not found" });
  }

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: PRODUCT_LIST_ID,
      range: "Orders!A3:Q",
    });
    const rows = response.data.values;
    if (!rows && !rows.length) {
      return res.status(404).send({ message: "No data found" });
    }

    const matchedOrder = rows.find((col) => col[13] === sessionId);

    if (!matchedOrder) {
      return res
        .status(403)
        .json({ message: "Invalid session, or order not found" });
    }

    const paymentStatus = matchedOrder[14];
    const email = matchedOrder[3];
    const orderNo = matchedOrder[16];
    // const msg = {
    //   to: email,
    //   from: "inga.gudaite@gmail.com",
    //   subject: "Užsakymas priimtas",
    //   text: `Dėkojame, ${email}, jūsų užsakymas priimtas, užsakymo nr.:${orderNo}`,
    //   html: `<div>Dėkojame, jūsų užsakymas priimtas, užsakymo nr. ${orderNo}: <strong></strong>.</div><br>
    //         <table><thead><tr style="text-align: left">
    //         <th colspan="1" style="border: 1px solid black">Nr.</th>
    //         <th colspan="1" style="border: 1px solid black">Pavadinimas</th>
    //         <th colspan="1" style="border: 1px solid black">Kaina</th>
    //         <th colspan="1" style="border: 1px solid black">Kiekis</th>
    //         </tr></thead></table>`,
    // };

    console.log("Email in payment status: ", email);
    console.log("order number: ", orderNo, "type: ", typeof orderNo);

    if (paymentStatus === "COMPLETED" && orderNo > 0) {
      axios
        .post(
          process.env.GOOGLE_SCRIPT_URL,
          JSON.stringify({
            orderNo: `${orderNo}`,
            email: `${matchedOrder[3]}`,
            firstName: `${matchedOrder[0]}`,
            lastName: `${matchedOrder[1]}`,
          }),
          {
            headers: { "Content-type": "application/json" },
          }
        )
        .then((response) => console.log("Invoice is created:", response.data))
        .catch((error) => {
          console.error(
            "Failed to trigger invoice generation:",
            error.response?.data || error.message
          );
        });

      res.status(200).json({
        paymentStatus: paymentStatus,
        clientOrderNo: orderNo,
        message: "Payment status is completed",
      });
      // sgMail
      //   .send(msg)
      //   .then(() => {
      //     console.log("Email sent successfully");
      //   })
      //   .catch((emailError) => {
      //     console.log(emailError);
      //     if (emailError.response) {
      //       console.error(emailError.response.body);
      //     }
      //   });
    } else {
      res.status(200).json({
        paymentStatus: paymentStatus,
        message: "Payment status is not completed",
      });
    }
  } catch (error) {
    console.error("Error reading data: ", error);
    return res.status(500).json({ message: "Server error" });
  }
};
