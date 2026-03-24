package types


type AddSkill struct {
	SkillId string `json:"skillId"`
	Name string `json:"name"`
	Description string `json:"description"`
	Version string `json:"version"`
	Config map[string]interface{} `json:"config"`
}
