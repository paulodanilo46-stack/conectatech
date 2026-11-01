const API_URL = "http://localhost:3000/api";

export async function apiRequest(endpoint, options = {}) {
    const { token, headers, ...restOptions } = options;

    const isFormData = restOptions.body instanceof FormData;

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...restOptions,

        body: restOptions.body && !isFormData
            ? JSON.stringify(restOptions.body)
            : restOptions.body,

        headers: {
            ...(!isFormData
                ? { "Content-Type": "application/json" }
                : {}),
            ...headers,
            ...(token
                ? { Authorization: `Bearer ${token}` }
                : {}),
        },
    });

    const dados = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(
            dados.mensagem ||
            dados.erro ||
            dados.message ||
            "Não foi possível realizar a solicitação."
        );
    }

    return dados;
}
