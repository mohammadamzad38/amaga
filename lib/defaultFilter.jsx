export const filters = {
  recent: {
    fiber: "",
    machine: "",
    yarn: "",
    textile: "",
    "buyer-post": "",
    portfolio: "portfolio_type=1",
    consultant: "portfolio_type=2",
    job: "",
    garment: "",
    "market-knowledge": "",
    logistic: "",
  },

  popular: {
    fiber: "user_id IN('111','119')",
    machine: "user_id IN('1258','1039','2353','8055','8056')",
    yarn: "user_id IN('59','116','111','8054')",
    textile: "user_id IN('1257','1039','8056')",
    "buyer-post": "",
    portfolio: "portfolio_type=1",
    consultant: "portfolio_type=2",
    job: "",
    garment: "user_id IN('116', '1257', '1258', '59', '8054', '8055', '8156')",
    "market-knowledge":
      "user_id IN('116','127','507','10','59','7926','6550','8055')",
    logistic: "",
  },
};
