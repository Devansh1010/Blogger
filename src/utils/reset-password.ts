import api from "@/lib/authAxios"

export const resetPassword = async (password: string, token: string) => {

    try {

        const response = await api.post(`/reset-password?${token}`, {
            password,
        })

        if (response.status === 200) {
            return response.data
        }

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred."
        console.error("Error resetting password:", errorMessage)
        throw new Error(errorMessage)
    }
}
