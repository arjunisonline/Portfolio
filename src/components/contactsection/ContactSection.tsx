import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { SiLeetcode } from "react-icons/si";

export default function ContactSection() {
  const form = useRef<HTMLFormElement | null>(null);
  const serviceId = "service_5gd2foj";
  const templateId = "template_g4fy5ql";
  const publicKey = "uPR1GKoi5uLTpJ3oc";
  const [isLoading, setisLoading] = useState(false);
  const sendEmail = (e: any) => {
    setisLoading(true);
    e.preventDefault();

    if (!form.current) return;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS environment variables are missing.");
      return;
    }

    emailjs.sendForm(serviceId, templateId, form.current, publicKey).then(
      () => {
        alert("Message sent successfully!");
        setisLoading(false);
        form.current?.reset();
      },
      (error) => {
        console.log(error.text);
      },
    );
  };
  return (
    <>
      <section id="contact">
        <h1 className="text-center text-4xl md:text-6xl">Let's Connect</h1>
        <div className="my-30 flex flex-col md:flex-row  justify-center gap-10 mx-4 md:mx-30">
          <form
            ref={form}
            onSubmit={sendEmail}
            className="border border-white/20 flex flex-col p-5 backdrop-blur-sm rounded-2xl"
          >
            <div>
              <input
                required
                type="text"
                name="name"
                id=""
                placeholder="Name"
                className="border border-white/20  m-2 p-3 rounded-md text-white"
              />
              <input
                required
                type="email"
                name="email"
                id=""
                placeholder="E-Mail"
                className="border border-white/20  m-2 p-3 rounded-md text-white"
              />
            </div>

            <textarea
              required
              name="message"
              id=""
              rows={6}
              placeholder="message"
              className="border border-white/20 m-2 p-3 rounded-md text-white"
            ></textarea>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-3 my-3 cursor-pointer"
            >
              Submit
            </button>
          </form>
          <div className="border border-white/20 flex flex-col p-5 backdrop-blur-sm rounded-2xl">
            <h1 className="text-2xl text-center font-extralight">
              Get in Touch
            </h1>
            <div className="my-10 space-y-10">
              <div className="flex items-center gap-5">
                <MdOutlineMail color="white" size={40} />
                <div>
                  <p className="text-white/40">Email</p>
                  <a href="">arjunisonlinee@gmail.com</a>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <IoLocationOutline color="white" size={40} />
                <div>
                  <p className="text-white/40">Location</p>
                  <a href="">Kerala, India</a>
                </div>
              </div>
              <div className="flex justify-evenly">
                <a href="https://github.com/arjunisonline">
                  <FaGithub
                    size={30}
                    className=" hover:text-(--primaryColor) hover:scale-120 transition duration-300 cursor-pointer"
                  />
                </a>
                <a href="https://www.linkedin.com/in/arjunssisonlinee/">
                  <FaLinkedin
                    size={30}
                    className=" hover:text-(--primaryColor) hover:scale-120 transition duration-300 cursor-pointer"
                  />
                </a>
                <a href="https://t.me/Botisonline">
                  <FaTelegram
                    size={30}
                    className=" hover:text-(--primaryColor) hover:scale-120 transition duration-300 cursor-pointer"
                  />
                </a>
                <a href="https://leetcode.com/u/1XLUhT7fPK/">
                  <SiLeetcode
                    size={30}
                    className=" hover:text-(--primaryColor) hover:scale-120 transition duration-300 cursor-pointer"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
