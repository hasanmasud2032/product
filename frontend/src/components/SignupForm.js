import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Form from "./Form";
import TextInput from "./TextInput";
import ValidationMessage from './ValidationMessage';

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState("");
  const [validationErrors, setValidationErrors] = useState(null);

  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState();

  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await signup({name, email, password, password_confirmation: password});
      setLoading(false);
      setValidationErrors(null);
      setName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      setAgree("")
      setSuccess('Registration complete successfully');
    } catch (error) {
      if(error.response.status === 422) {
        setValidationErrors(error.response.data.errors)
      }
      setLoading(false);
    }
  }

  return (
    <Form style={{ height: "500px" }} onSubmit={handleSubmit}>
      <div>
        <TextInput
          type="text"
          placeholder="Enter name"
          icon="person"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {validationErrors && <ValidationMessage data={validationErrors} field='name' />}
      </div>

     <div>
      <TextInput
          type="text"
          placeholder="Enter email"
          icon="alternate_email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {validationErrors && <ValidationMessage data={validationErrors} field='email' />}
     </div>

     <div>
      <TextInput
          type="password"
          placeholder="Enter password"
          icon="lock"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

       {validationErrors && <ValidationMessage data={validationErrors} field='password' />}
     </div>

      <TextInput
        type="password"
        placeholder="Confirm password"
        icon="lock_clock"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Checkbox
        text="I agree to the Terms &amp; Conditions"
        value={agree}
        onChange={(e) => setAgree(e.target.value)}
      />

      <Button disabled={loading} type="submit">
        <span>Submit Now</span>
      </Button>

      {success && <p className="success">{success}</p>}

      <div className="info">
        Already have an account? <Link to="/login">Login</Link> instead.
      </div>
    </Form>
  );
}
