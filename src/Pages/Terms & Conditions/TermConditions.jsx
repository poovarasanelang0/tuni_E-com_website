import React from "react";
import "./TermConditions.css";
import { Container, Row, Col } from "reactstrap";
import Header from "../../Compoment/Header/Header";
import Footer from "../../Compoment/Footer/Footer";

const TermConditions = () => {
  return (
    <>
    <Header />
      <Container className="mt-5 pt-4">
        <Row>
          <Col>
            <h2 className="titles text-center">Terms & Conditions</h2>
            <div className="font">
              <p className="my-3">
                These Terms govern your access to, usage of all content, Product
                and Services available at www.tunitechsolutions.com website (the
                Service) operated by Tuni Tech Solutions Private Limited.
              </p>
              <p className="my-3">
                Your access to our services are subject to your acceptance,
                without modification, of all of the terms and conditions
                contained herein and all other operating rules and policies
                published and that may be published from time to time by us.
              </p>
              <p className="my-3">
                Please read the Agreement and the Privacy Policy carefully
                before accessing or using our Services. By accessing or using
                any part of our Services, you agree to be bound by these Terms.
                If you do not agree to any part of the terms of the Agreement
                and the Privacy Policy, then you may not access or use our
                Services.
              </p>
              <p className="my-3">
                <b>Accounts</b>
              </p>
              <p className="my-3">
                Where use of any part of our Services requires an account, you
                agree to provide us with complete and accurate information when
                you register for an account.
              </p>
              <p className="my-3">
                You will be solely responsible and liable for any activity that
                occurs under your account. You are responsible for keeping your
                account information up-to-date and for keeping your password
                secure.
              </p>
              <p className="my-3">
                You are responsible for maintaining the security of your account
                that you use to access the Service. You shall not share or
                misuse your access credentials. You must notify us immediately
                of any unauthorized uses of your account or upon becoming aware
                of any other breach of security.
              </p>
              <p className="my-3">
                <b>Termination</b>
              </p>
              <p className="my-3">
                We may terminate or suspend your access to all or any part of
                our Services at any time, with or without cause, with or without
                notice, effective immediately.
              </p>
              <p className="my-3">
                If you wish to terminate the Agreement or your www.derbymen.com
                account, you may simply discontinue using our Services.
              </p>
              <p className="my-3">
                All provisions of the Agreement which by their nature should
                survive termination shall survive termination, including,
                without limitation, ownership provisions, warranty disclaimers,
                indemnity, and limitations of liability.
              </p>
              <p className="my-3">
                <b>Disclaimer</b>
              </p>
              <p className="my-3">
                Our Services are provided “AS IS and AS AVAILABLE” basis. Tuni Tech Solutions Private Limited and its suppliers and licensors hereby
                disclaim all warranties of any kind, express or implied,
                including, without limitation, the warranties of
                merchantability, fitness for a particular purpose and
                non-infringement. Neither Tuni Tech Solutions Private Limited, nor
                its suppliers and licensors, makes any warranty that our
                Services will be error free or that access thereto will be
                continuous or uninterrupted. You understand that you download
                from, or otherwise obtain content or services through, our
                Services at your own discretion and risk.
              </p>
              <p className="my-3">
                <b>Jurisdiction and Applicable Law</b>
              </p>
              <p className="my-3">
                This Agreement and any access to or use of Services will be
                governed by and interpreted according to the laws of India. All
                disputes arising under the Agreement will be subject to the
                exclusive jurisdiction of the courts in Chennai
              </p>
              <p className="my-3">
                <b>Changes</b>
              </p>
              <p className="my-3">
              Tuni Tech Solutions Private Limited reserves the right, at our sole
                discretion, to modify or replace these Terms at any time.
              </p>
              <p className="my-3">
                If we make changes that are material, we will let you know by
                posting on our website. The notice will designate a reasonable
                period of time after which the new terms will take effect
              </p>
              <p className="my-3">
                If you disagree with our changes, then you should stop using our
                Services within the designated notice period, or once the
                changes become effective.
              </p>
              <p className="my-3">
                Your continued use of our Services will be subject to the new
                terms.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default TermConditions;
