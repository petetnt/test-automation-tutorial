import type { ActionArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { useActionData, Form, useTransition} from "@remix-run/react";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (email !== "test@vincit.com" || password !== "testpassword") {
    return json({
      errors: "Email or password was wrong",
      values: {
        email: email?.toString(),
        password: password?.toString()
      }
    })
  }
  
  return redirect(`/dashboard`);
};

export default function Index() {
  const transition = useTransition();
  const actionData = useActionData<typeof action>();

  return (
    <>
      <div className="text-center bg-gray-50 text-gray-800 py-20 px-6">
        <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">My awesome app :D</h1>
      </div>

      <section className="">
        <div className="px-6 h-full text-gray-800">
          <div
            className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
          >
            <div
              className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
            >
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt=""
              />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <Form method="post" action="/?index">
                <div className="flex flex-row items-center justify-center lg:justify-start">
                  <p className="text-lg mb-0 mr-4">Sign in</p>
                </div>

                <div
                  className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                />
                <div className="mb-6">
                 <label className="w-full form-check-label inline-block text-gray-800" htmlFor="email">Email</label>

                  <input
                    disabled={transition.state === "submitting"}
                    name="email"
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="email"
                    placeholder="Email address"
                    defaultValue={actionData?.values.email}
                  />
                </div>

                <div className="mb-6">
                 <label className="w-full form-check-label inline-block text-gray-800" htmlFor="password">
                  Password
                  </label>

                  <input
                    disabled={transition.state === "submitting"}
                    name="password"
                    type="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="password"
                    placeholder="Password"
                    defaultValue={
                      actionData?.values.password
                    }
                  />
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div className="form-group form-check">
                    <input
                      disabled={transition.state === "submitting"}
                      type="checkbox"
                      className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      id="exampleCheck2"
                    />
                    <label className="form-check-label inline-block text-gray-800" htmlFor="exampleCheck2"
                      >Remember me</label
                    >
                  </div>
                  <a href="/forgot-password" className="text-gray-800">Forgot password?</a>
                </div>


                {actionData?.errors &&
                  <div className="bg-red-50 mb-5 p-5">{actionData?.errors}</div>
                }

                <div className="text-center lg:text-left">
                  <button
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Login
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Don't have an account?
                    <a
                      href="#!"
                      className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                      > Register</a
                    >
                  </p>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
