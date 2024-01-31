const { BACKEND_API_ENDPOINT } = process.env;

const main = async () => {
  console.log("Running create-payouts-monthly cron job...");

  console.log("Making POST request to /webhooks/create-payouts...");

  const response = await fetch(
    BACKEND_API_ENDPOINT + "/webhooks/create-payouts",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const { count } = await response.json();

  console.log(`Created ${count} payouts.`);
  console.log("See backend logs for more details.");
};

module.exports = { main };
