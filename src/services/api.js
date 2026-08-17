const BASE_URL = "https://api.tvmaze.com";

export async function getShows(page = 1) {
  const response = await fetch(`${BASE_URL}/shows?page=${page}`);

  if (!response.ok) {
    throw new Error("Failed to fetch shows");
  }

  return response.json();
}

export async function searchShows(query) {
  const response = await fetch(
    `${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to search shows");
  }

  return response.json();
}

export async function getShowDetails(id) {
  const response = await fetch(
    `${BASE_URL}/shows/${id}?embed=cast`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch show details");
  }

  return response.json();
}