/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts";

// stripe.js
// stripe.js
  const stripe = Stripe(
    "pk_test_51Qnr1YFY7JPTy18WDrWYkwbPWGMWEpiSb3NPTn3BmuJjl717C2WgQK8YhFDFgwkqIBUSAvOVQbG2ng1ysEnofRxl00rRBukZL1"
  );

  document.getElementById("book-tour")?.addEventListener("click", async (e) => {
    e.target.textContent = "Processing...";

    const tourId = e.target.dataset.tourId;
    try {
      const session = await axios(
        `/api/v1/bookings/checkout-session/${tourId}`
      );
      console.log("Session response:", session);
      await stripe.redirectToCheckout({
        sessionId: session.data.data.sessionId,
      });
      showAlert("success", "Booking was successfully!");
    } catch (err) {
      console.error("Booking error:", err);
      showAlert("error", "Booking was not successfully!");
      e.target.textContent = "Book tour now!";
    }
  });

