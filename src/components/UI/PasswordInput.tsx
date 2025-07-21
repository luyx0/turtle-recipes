import { FC, useState } from 'react';
import Input from './input';
interface PasswordInputProps {
  password: string;
  setPassword: (password: string) => void;
}
const PasswordInput: FC<PasswordInputProps> = ({ password, setPassword }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <Input
        type={showPassword ? 'text' : 'password'}
        name="password"
        value={password}
        onChange={e => setPassword(e.currentTarget.value)}
        placeholder="Password"
        label="Password"
      />
      {password && (
        <img
          src={showPassword ? '/openEyes.png' : '/closeEyes.png'}
          alt="Toggle visibility"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: 'absolute',
            right: '10px',
            top: '65%',
            transform: 'translateY(-50%)',
            width: '24px',
            height: '24px',
            cursor: 'pointer',
          }}
        />
      )}
    </div>
  );
};

export default PasswordInput;
