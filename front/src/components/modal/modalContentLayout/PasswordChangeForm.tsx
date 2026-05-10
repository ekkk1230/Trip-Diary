interface PasswordChangeFormProps {
    onChange: (newPassword: string) => void
}

function PasswordChangeForm({ onChange }: PasswordChangeFormProps) {
    return (
        <div>
            <input name="newPassword" type="password" onChange={(e) => onChange(e.target.value)} placeholder="새 비밀번호" />
            <input name="confirmPassword" type="password" onChange={(e) => onChange(e.target.value)} placeholder="새 비밀번호 확인" />
        </div>
    )
}

export default PasswordChangeForm