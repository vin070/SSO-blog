function createAPIResultsContainer() {
  //Create API Results container
  const apiResults = document.createElement("div");
  apiResults.id = "api-results";

  //Create Loading indicator
  const loadingDiv = document.createElement("div");
  loadingDiv.id = "loading";
  loadingDiv.textContent = "Loading API data...";

  //Create Error indicator
  const errorDiv = document.createElement("div");
  errorDiv.id = "error";

  // Add elements to page
  document.body.appendChild(apiResults);
  apiResults.appendChild(loadingDiv);
  return { apiResults, loadingDiv, errorDiv };
}

async function fetchPosts(apiResults, loadingDiv, errorDiv) {
  try {
    console.log("Fetching posts from JSONPlaceholder API...");
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=3"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    loadingDiv.remove();
    apiResults.innerHTML = "API call completed successfully!";
  } catch (error) {
    console.error("Error fetching posts:", error);
    loadingDiv.remove();
    errorDiv.style.display = "block";
    errorDiv.textContent = `❌ Error fetching posts: ${error.message}`;
    apiResults.appendChild(errorDiv);
  }
}
// Execute API call when page loads
document.addEventListener("DOMContentLoaded", () => {
  const { apiResults, loadingDiv, errorDiv } = createAPIResultsContainer();
  fetchPosts(apiResults, loadingDiv, errorDiv);
});
