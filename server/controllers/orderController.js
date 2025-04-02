const { v4: uuidv4 } = require("uuid");
const { sheets, PRODUCT_LIST_ID } = require("../utils/googleSheets");
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

exports.createOrder = async (req, res) => {
  console.log("Request received on /api/order");

  const orderNo = uuidv4();
  const sessionId = uuidv4();

  const {
    _csrf,
    products,
    amountWithPVM,
    amountPVM,
    amountWithoutPVM,
    purchaser,
    discountCode,
    paymentStatus,
  } = req.body;

  console.log("ored req.csrfToken: ", req.csrfToken);

  if (_csrf !== req.csrfToken) {
    return res
      .status(403)
      .send("Jūsų sesija pasibaigė. Įkelkite puslapį iš naujo.");
  }

  console.log(
    "Payload being sent to Google Sheets:",
    purchaser,
    discountCode,
    paymentStatus,
    "Package: ",
    products[0].packageQty
  );

  const arrOfProducts = [];
  products.forEach((product) => {
    arrOfProducts.push([
      product.id,
      product.title,
      product.quantity,
      product.price,
      product.totalPrice,
      Number(product.packageTotalQty),
      Number(product.packageTotalPrice).toFixed(2),
      Number(product.deliveryPrice).toFixed(2),
    ]);
  });
  console.log("arrOfProducts: ", arrOfProducts);

  const orderValues = (
    purchaser,
    arrOfProducts,
    amountWithPVM,
    amountPVM,
    amountWithoutPVM,
    discountCode,
    session,
    status
  ) => {
    let arr = [];
    for (const product of arrOfProducts) {
      arr.push(
        purchaser
          .concat(product)
          .concat(amountWithPVM)
          .concat(amountPVM)
          .concat(amountWithoutPVM)
          .concat(discountCode)
          .concat(session)
          .concat(status)
      );
    }
    return arr;
  };

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: PRODUCT_LIST_ID,
      range: "Orders!A3:Z",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      resource: {
        majorDimension: "ROWS",
        values: orderValues(
          [
            DOMPurify.sanitize(purchaser.firstName),
            DOMPurify.sanitize(purchaser.lastName),
            DOMPurify.sanitize(purchaser.phone),
            DOMPurify.sanitize(purchaser.email),
            DOMPurify.sanitize(purchaser.address),
            DOMPurify.sanitize(purchaser.town),
            DOMPurify.sanitize(purchaser.postCode),
            orderNo,
            purchaser.termsConfirmed,
          ],
          arrOfProducts,
          Number(amountWithPVM).toFixed(2),
          Number(amountPVM).toFixed(2),
          Number(amountWithoutPVM).toFixed(2),
          discountCode,
          sessionId,
          paymentStatus
        ),
      },
    });
    res.cookie("session", sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
      maxAge: 30 * 60 * 1000,
    });
    res.status(200).json({
      status: 200,
      message: `Užsakymą gavau. Spauskite žemiau "apmokėti".`,
      orderId: `${orderNo}`,
      paymentStatus: "pending",
      redirectToPayment: true,
      userIp: req.userIp,
    });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json("Error updating data");
  }
};
