import Link from "next/link";
import GoogleLogin from "@/components/shared/CTA Buttons/GoogleLogin/GoogleLogin";
import { SignUpForm } from "@/components/ui/auth/sign-up/SignUpForm";

export default function Login() {
	return (
		<section id="login" className="">
			<div className="cssContainer flex flex-col gap-12 items-center ">
				<h1 className="">Register</h1>

				<div className="w-full flex flex-col gap-5 max-w-130  bg-white rounded-(--field-radius) p-8 ">
					<SignUpForm />

					{/* Social Login*/}
					<div className="space-y-3">
						<p className="text-center text-sm!">Or Register With</p>
						<GoogleLogin />
					</div>

					{/* Link to Login page*/}
					<p className="text-sm! text-center">
						Already Have an account?{" "}
						<Link href={`/login`} className="text-blue-500">
							Login here
						</Link>
					</p>
				</div>
			</div>
		</section>
	);
}
