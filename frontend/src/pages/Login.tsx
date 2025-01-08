import Form from "../components/Form";

// Step 16 Using the form for logging in
export default function Login() {
  return <Form route="/api/token/" method="login" />;
}
