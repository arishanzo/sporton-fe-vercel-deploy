export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const fallbackApiUrl = `https://be-sporton.agunacourse.com/api`;
const apiUrl = process.env.NEXT_PUBLIC_API_URL || fallbackApiUrl;
const res = await fetch(`${apiUrl}${endpoint}`, { ...options, cache: options?.cache || "no-store", });


  if (!res.ok) {
    let errorMessage = `Failed to fetch data from ${endpoint}`;
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch (e) {
      console.log(e);
    }

    throw new Error(errorMessage);
  }

  return res.json();
}

export function getImageUrl(path: string | undefined | null) {
  if (!path || path === "undefined" || path === "null") {
    return "/images/placeholder.svg";
  }
  
  if (path.startsWith("http")) return path;
  
  if (path.startsWith("/")) return path;
  
  const fallbackApiRoot = "https://be-sporton.agunacourse.com";
  const apiRoot = process.env.NEXT_PUBLIC_API_ROOT || fallbackApiRoot;
  return `${apiRoot}/${path}`;
}