import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import Title from "../Title/Title";

const Contact = () => {
    const sendEmail = (e) => {
        e.preventDefault();

        const data = {
            name: e.target.name.value,
            email: e.target.email.value,
            subject: e.target.subject.value,
            message: e.target.message.value,
        };
        emailjs
            .send(
                "service_znw1yjh",
                "template_m180som",
                data,
                "user_T3Rej0OAIHjQAPNwyzQbs"
            )
            .then(
                function (res) {
                    if (res.status === 200) {
                        Swal.fire({
                            icon: "success",
                            title: "🆗 Mail Sent Successfully",
                            showConfirmButton: true,
                            timer: 2000,
                        });
                    }
                },
                function (error) {
                    if (error) {
                        Swal.fire({
                            icon: "error",
                            title: "Oops... Mail not sent!",
                            text: "Something went wrong!",
                        });
                    }
                }
            );
        e.target.reset();
    };

    return (
        <div className="">
            <section className="bg-slate-900 shadow-xl shadow-slate-700 pt-10">
                <Title
                    title={"Contact Me"}
                    subTitle="Contact Me For Any Project Or Query"
                />
                <div className="container px-5 pt-5 pb-10 mx-auto flex sm:flex-nowrap flex-wrap">
                    <div className="xl:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.574858928633!2d90.38453907466949!3d23.798148978637794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c73b2dde7ef3%3A0xbd1698d8a61085d9!2sMirpur%2014!5e0!3m2!1sen!2sbd!4v1693181029276!5m2!1sen!2sbd"
                            title="map"
                            width="100%"
                            height="100%"
                            className="absolute inset-0"
                            style={{
                                filter: "grayscale(1) contrast(1.1)",
                                opacity: "0.9",
                            }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                        <div className="bg-slate-900 shadow-xl shadow-slate-700 relative flex flex-wrap py-6 rounded text-white">
                            <div className="lg:w-1/2 px-6">
                                <h2 className="title-font font-semibold tracking-widest text-xs">
                                    ADDRESS
                                </h2>
                                <p className="mt-1">
                                    Mirpur 14, Dhaka, Bangladesh
                                </p>
                            </div>
                            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                                <h2 className="title-font font-semibold  tracking-widest text-xs">
                                    EMAIL
                                </h2>
                                <a className="text-indigo-500 leading-relaxed">
                                    razikuljoni@gmail.com
                                </a>
                                <h2 className="title-font font-semibold tracking-widest text-xs mt-4">
                                    PHONE
                                </h2>
                                <p className="leading-relaxed">
                                    (+880) 1623208660 (Whatsapp)
                                </p>
                            </div>
                        </div>
                    </div>
                    <form
                        onSubmit={sendEmail}
                        className="lg:w-1/2 md:w-1/2  flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0"
                    >
                        <h2 className="text-white text-lg mb-1 font-medium title-font">
                            Contact With Me
                        </h2>
                        <p className="leading-relaxed mb-5 text-white">
                            For any query or project and suggestion feel free to
                            contact me.
                        </p>
                        <div className="relative mb-4">
                            <label
                                htmlFor="name"
                                className="leading-7 text-sm text-white"
                            >
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                required
                            />
                        </div>
                        <div className="relative mb-4">
                            <label
                                htmlFor="email"
                                className="leading-7 text-sm text-white"
                            >
                                Your Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                required
                            />
                        </div>
                        <div className="relative mb-4">
                            <label
                                htmlFor="subject"
                                className="leading-7 text-sm text-white"
                            >
                                Subject
                            </label>
                            <input
                                type="subject"
                                id="subject"
                                name="subject"
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                required
                            />
                        </div>
                        <div className="relative mb-4">
                            <label
                                htmlFor="message"
                                className="leading-7 text-sm text-white"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                        >
                            Send Email
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};
export default Contact;
