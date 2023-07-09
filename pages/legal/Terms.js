import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

function Terms() {
  return (
    <div className="pb-20">
      <Navbar />
      <div className="content lg:pr-24">
        <div className="legal ">
          <h3 className="mt-5">Terms and conditions</h3>
          <p className="mt-2">
            By accessing and using Ruzpro.com, you agree to comply with the
            following terms and conditions. Please read them carefully before
            using our website.
          </p>
          <p className="mt-3">
            1. Listing Portal: Ruzpro.com serves as a platform for users to
            upload and showcase their real estate properties. We do not create
            or verify the content uploaded by users. The responsibility for the
            accuracy, legitimacy, and authenticity of the listings lies solely
            with the users.
          </p>
          <p className="mt-3">
            2. No Verification of Properties and Contact Details: Ruzpro.com
            does not verify the properties, contact details, or any other
            information provided by users. We do not guarantee the authenticity,
            reliability, or accuracy of the content or the contact information.
            Users are solely responsible for ensuring the truthfulness of their
            uploads.
          </p>
          <p className="mt-3">
            3. User Responsibility: Users are responsible for ensuring that the
            properties they list on{" "}
            <a href="https://www.ruzpro.com/">Ruzpro.com</a> are real and that
            the addresses provided are accurate. Any disputes or legal
            proceedings arising from misleading or false listings are solely the
            responsibility of the user who uploaded the content.
          </p>
          <p className="mt-3">
            4. Owner&apos;s Responsibility:{" "}
            <a href="https://www.ruzpro.com/">Ruzpro.com</a> is not responsible
            for any issues, disputes, or liabilities that may arise between the
            owners of the listed properties and third parties. Users are advised
            to exercise due diligence, including conducting necessary
            inspections and verifying the legitimacy of the listings and the
            parties involved.
          </p>
          <p className="mt-3">
            5. Free Services and Support: Currently, the property uploading to{" "}
            <a href="https://www.ruzpro.com/">Ruzpro.com</a> is completely free
            of charge. However, to ensure the continued operation and
            maintenance of the website, users have the option to support us with
            monetary contributions. Contributions are voluntary and
            non-refundable.
          </p>
          {/* <p className="mt-3">6. Prohibited Property Listings: Users are prohibited from listing properties that involve bars,  sexual fec, or any other content deemed inappropriate by . We reserve the right to remove such listings without prior notice.</p> */}
          <p className="mt-3">
            6. Verification Responsibility: Users must independently verify the
            authenticity, accuracy, and legality of the listed properties and
            the provided addresses.{" "}
            <a href="https://www.ruzpro.com/">Ruzpro.com</a> is not responsible
            for any consequences resulting from the failure to verify the
            listings or addresses.
          </p>
          <p className="mt-3"></p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Terms;
