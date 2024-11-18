export const fetchNodes = async (accessToken: string) => {
  try {
    const response = await fetch("https://api.rdm.nii.ac.jp/v2/nodes/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data; // 必要なデータ部分だけ返す
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchProjectFiles = async (
  accessToken: string,
  projectId: string
) => {
  try {
    const response = await fetch(
      `https://api.rdm.nii.ac.jp/v2/nodes/${projectId}/files/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data; // 必要なデータ部分だけ返す
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchFiles = async (
  accessToken: string,
  project: string,
  path: string[]
) => {
  try {
    const response = await fetch(
      `https://api.rdm.nii.ac.jp/v2/nodes/${project}/files/${path.join("/")}/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data; // 必要なデータ部分だけ返す
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchFilesById = async (accessToken: string, id: string) => {
  try {
    const response = await fetch(`https://api.rdm.nii.ac.jp/v2/files/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data; // 必要なデータ部分だけ返す
  } catch (error) {
    console.error(error);
    throw error;
  }
};
