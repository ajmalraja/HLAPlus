const PROXY_CONFIG = [
    {
        context: [
            "/my",
            "/many",
            "/endpoints",
            "/i",
            "/need",
            "/to",
            "/proxy",



        ],
        target: "http://localhost:50817",
        secure: false
    },
    {
      context: [
          "/api/*","/api/*/*","/token/*"
      ],
      target: "http://localhost:50817",
      secure: false
  }
]


module.exports = PROXY_CONFIG;
