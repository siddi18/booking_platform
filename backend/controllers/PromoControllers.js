//Promo Codes Controllers


// Promo codes configuration
const PROMO_CODES = {
  'SAVE10': { type: 'percentage', value: 10 },
  'FLAT100': { type: 'flat', value: 100 },
  'WELCOME': { type: 'percentage', value: 15 },
  'ADVENTURE20': { type: 'percentage', value: 20 }
};


//validate the promo codes
export const validatePromoCode = async (req, res) => {
  try {
    const { code, subtotal } = req.body;

    if (!code) {
      return res.status(400).json({ message: "Promo code is required" });
    }

    const promoCode = code.toUpperCase();
    const promo = PROMO_CODES[promoCode];

    if (!promo) {
      return res.status(404).json({ message: "Invalid promo code" });
    }

    let discount = 0;
    if (promo.type === "percentage") {
      discount = (subtotal * promo.value) / 100;
    } else if (promo.type === "flat") {
      discount = promo.value;
    }

    res.json({
      valid: true,
      code: promoCode,
      discount: Math.round(discount),
      type: promo.type,
      value: promo.value,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error validating promo code", error: error.message });
  }
}