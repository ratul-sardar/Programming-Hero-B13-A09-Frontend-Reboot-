import Link from "next/link";
import GoogleLogin from "@/components/shared/CTA Buttons/GoogleLogin/GoogleLogin";
import { LoginForm } from "@/components/ui/auth/login/LoginForm";

export default function Login() {
	return (
		<section id="login" className="">
			<div className="cssContainer flex flex-col gap-12 items-center ">
				<h1 className="">Login</h1>

				<div className="w-full flex flex-col gap-5 max-w-130  bg-white rounded-(--field-radius) p-8 ">
					<LoginForm />

					{/* Social Login*/}
					<div className="space-y-3">
						<p className="text-center text-sm!">Or Login With</p>
						{/* <Button variant="outline" className={`text-accent w-full`}>
                <BsGoogle /> Google
              </Button>*/}
						<GoogleLogin></GoogleLogin>
					</div>

					{/* Link to Register page*/}
					<p className="text-sm! text-center">
						Don&apos;t Have an account?{" "}
						<Link href={`/sign-up`} className="text-blue-500">
							Register here
						</Link>
					</p>
				</div>
			</div>
		</section>
	);
}
