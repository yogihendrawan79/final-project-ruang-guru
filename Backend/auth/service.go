package auth

// bikin kontrak interface untuk function di auth
type Service interface {
	GenerateToken(id_user int) (string, error)
}

// struct service
type service struct{}

// func NewServiceAuth
func NewServiceAuth() *service {
	return &service{}
}

// function untuk generate token
func (s *service) GenerateToken(id_user int) (string, error) {
	return "", nil
}
