exports.User = {
  user: (args, req) => {
    console.log("arg", args);
    return {
      user: "Noone",
    };
  },
};
