const { v4: uuidv4 } = require("uuid");
const { sheets, PRODUCT_LIST_ID } = require("../utils/googleSheets");
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

exports.createOrder = async (req, res) => {
  console.log("Request received on /api/order");
  const orderNo = uuidv4();

  const { products, purchaser, paymentStatus } = req.body;
  console.log(
    "Payload being sent to Google Sheets:",
    purchaser.firstName,
    purchaser.termsConfirmed,
    products[0].title
  );

  const arrOfProducts = [];
  products.forEach((product) => {
    arrOfProducts.push([
      product.id,
      product.title,
      product.quantity,
      product.totalPrice,
    ]);
  });
  console.log("arrOfProducts: ", arrOfProducts);

  const orderValues = (arr1, arr2, status) => {
    let arr = [];
    for (const element of arr2) {
      arr.push(arr1.concat(element).concat(status));
    }
    return arr;
  };

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: PRODUCT_LIST_ID,
      range: "Orders!A2",
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
            DOMPurify.sanitize(purchaser.street),
            DOMPurify.sanitize(purchaser.town),
            DOMPurify.sanitize(purchaser.postCode),
            orderNo,
            purchaser.termsConfirmed,
          ],
          arrOfProducts,
          paymentStatus
        ),
      },
    });
    res.status(200).json({
      status: 200,
      message: "Užsakymas apdorojamas",
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
