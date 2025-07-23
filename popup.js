document.getElementById("checkBtn").addEventListener("click", async () => {
  const text = document.getElementById("studentText").value.trim();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (!text) {
    resultsDiv.textContent = "Please enter some text to check.";
    return;
  }

  const response = await fetch("https://api.languagetoolplus.com/v2/check", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `language=en-US&text=${encodeURIComponent(text)}`
  });

  const data = await response.json();

  if (data.matches.length === 0) {
    resultsDiv.textContent = "No issues found!";
    return;
  }

  data.matches.forEach((match) => {
    const issue = document.createElement("div");
    issue.className = "issue";
    issue.innerHTML = `
      <strong>Issue:</strong> ${match.message}<br>
      <strong>Text:</strong> "${text.substr(match.offset, match.length)}"
    `;
    resultsDiv.appendChild(issue);
  });
});