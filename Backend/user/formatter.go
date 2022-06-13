package user

// struct formatter
type userFormat struct {
	Id_users int    `json:"id_user"`
	Nama     string `json:"nama"`
	Email    string `json:"email"`
	Role     string `json:"role"`
}

// function genereate format
func FormatUser(input User) userFormat {
	return userFormat{
		Id_users: input.Id_users,
		Nama:     input.Nama,
		Email:    input.Email,
		Role:     input.Role,
	}
}
