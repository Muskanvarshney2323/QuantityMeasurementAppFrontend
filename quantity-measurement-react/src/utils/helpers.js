export const formatResultText = (response) => {
  if (!response) return "Result will appear here";

  if (typeof response === "string") return response;

  return (
    response.result ||
    response.message ||
    response.data ||
    JSON.stringify(response)
  );
};