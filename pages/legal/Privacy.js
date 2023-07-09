import React from "react";
import Navbar from "../../components/Navbar";
import AlbumIcon from "@mui/icons-material/Album";
import Link from "next/link";
import Footer from "../../components/Footer";
export default function Privacy() {
  return (
    <div className="pb-20">
      <Navbar />

      <div className="content  lg:pr-20">
        <div className="legal ">
          {" "}
          <h3 className="mt-5">Privacy policy</h3>
          <p className="mt-2">
            This Privacy Policy describes how Ruzpro.com collects, uses, and
            discloses personal information when you visit our website and use
            our services. We are committed to protecting your privacy and
            ensuring the security of your personal information. By using our
            website, you consent to the practices described in this Privacy
            Policy.
          </p>
          <div className="flex mt-3">
            <AlbumIcon id="album__icon" />
            <p className="ml-2">
              We may collect personal information that you voluntarily provide
              to us when you register an account, list or search for properties,
              communicate with other users, or use our services. This may
              include your name, email address, phone number, and any other
              information you provide to us.
            </p>
          </div>
          <div className="flex mt-3">
            <AlbumIcon id="album__icon" />
            <p className="ml-2">
              We may collect non-personal information about your interactions
              with our website, such as your IP address, device information,
              browser type, and browsing behavior. This information helps us
              analyze trends, administer the site, improve user experience, and
              gather demographic information.
            </p>
          </div>
          <div className="flex mt-3">
            <AlbumIcon id="album__icon" />
            <p className="ml-2">
              We use the personal information we collect to provide and improve
              our services, facilitate property listings and searches,
              communicate with users, process transactions, and respond to
              inquiries or requests. We may also use this information to
              personalize your experience, send promotional materials, and
              provide relevant recommendations.
            </p>
          </div>
          <div className="flex mt-3">
            <AlbumIcon id="album__icon" />
            <p className="ml-2">
              We may use non-personal information for various purposes,
              including website analytics, improving our services, and tailoring
              content to better suit user preferences.
            </p>
          </div>{" "}
          <div className="flex mt-3">
            <AlbumIcon id="album__icon" />
            <p className="ml-2">
              We may engage trusted third-party service providers to perform
              certain functions on our behalf, such as website hosting, data
              analysis, customer support, and marketing assistance. These
              service providers have access to personal information only as
              needed to perform their functions and are obligated to maintain
              its confidentiality.
            </p>
          </div>{" "}
          <div className="flex mt-3">
            <AlbumIcon id="album__icon" />
            <p className="ml-2">
              We may disclose personal information if required by law,
              government request, or to protect the rights, property, or safety
              of Ruzpro.com, its users, or others.
            </p>
          </div>{" "}
          <div className="flex mt-3">
            <AlbumIcon id="album__icon" />
            <p className="ml-2">
              We implement appropriate security measures to protect personal
              information from unauthorized access, alteration, disclosure, or
              destruction. However, please note that no method of transmission
              over the internet or electronic storage is completely secure, and
              we cannot guarantee absolute security.
            </p>
          </div>{" "}
          <div className="flex mt-3">
            <AlbumIcon id="album__icon" />
            <p className="ml-2">
              You have the right to access, update, correct, or delete your
              personal information. You may also opt-out of receiving
              promotional communications from us. Please contact us using the
              information provided below to exercise these rights or for any
              privacy-related inquiries.
            </p>
          </div>{" "}
          <div className="flex mt-3">
            <AlbumIcon id="album__icon" />
            <p className="ml-2">
              Our website may contain links to third-party websites or services.
              We are not responsible for the privacy practices or content of
              these websites. We encourage you to review the privacy policies of
              these third parties before providing any personal information.
            </p>
          </div>{" "}
          <div className="flex mt-3">
            <AlbumIcon id="album__icon" />
            <p className="ml-2">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or legal requirements. We will notify you
              of any material changes by posting the updated Privacy Policy on
              our website. Please review this policy periodically for any
              updates.
            </p>
          </div>{" "}
          <div className="flex mt-3">
            <AlbumIcon id="album__icon" />
            <p className="ml-2">
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or our privacy practices, please contact us at{" "}
              <span style={{ color: "blue", textDecoration: "underline" }}>
                <Link href="/legal/contact">contact page</Link>
              </span>
              .
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
