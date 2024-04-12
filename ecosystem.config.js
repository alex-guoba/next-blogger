module.exports = {
  apps: [
    {
      name: "next-blogger",
      exec_mode: "fork",
      instances: 1, // Or a number of instances
      script: "./node_modules/next/dist/bin/next",
      args: "start",
      // exp_backoff_restart_delay: 100, // optional, adjust as needed
      watch: false, // optional, adjust as needed
      max_memory_restart: "800M", // optional, adjust as needed
    },
  ],
};
