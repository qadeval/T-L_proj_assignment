class contact_us_po {
  visitContactus() {
    cy.visit(Cypress.env("test_url"));
  }
  title_validation() {
    cy.title().should("eq", "Reach out to Founder and Lightning today");
  }
  url_validation() {
    cy.url().should("eq", "https://www.founderandlightning.com/contact");
  }

  click_btn() {
    cy.get("input[value='Send Message >']")
      .should("be.visible")
      .and("be.enabled")
      .then(($btn) => {
        $btn.trigger("click");
      });
  }
  error_ui() {
    cy.get("#firstname-b15d4232-7672-429d-81fd-a00020bddf95").should(
      "have.class",
      "hs-input invalid error"
    );
  }
  error_text() {
    cy.xpath(
      "//label[normalize-space()='Please complete this required field.']"
    )
      .should("be.visible")
      .and(
        "have.text",
        "Please complete this required field.Please complete this required field.Please complete this required field.Please complete this required field.Please complete this required field."
      );
  }
  invalid_email_error_text() {
    cy.xpath("//label[normalize-space()='Email must be formatted correctly.']")
      .should("be.visible")
      .and("have.text", "Email must be formatted correctly.");
  }
  /**This will check that the input field with the attribute name
   * set to "phone" match the regular expression /^[0-9]{10}$/,
   * which means it will only accept 10 digits
   *  and no other characters.
   *
   */
  invalid_mobile_no_validation() {
    cy.get("#mobilephone-b15d4232-7672-429d-81fd-a00020bddf95").should(
      ($input) => {
        expect($input.val()).to.match(/^\d{10}$/);
      }
    );
  }

  validate_hear_from_us_option() {
    cy.get("#how_did_you_hear_about_us_-b15d4232-7672-429d-81fd-a00020bddf95>*")
      .contains("Referral")
      .nextAll()
      .should(
        "have.text",
        "Word of mouthEventArticleFacebookTwitterInstagramLinkedInJob boardOtherClubhouse"
      );
    cy.get("#how_did_you_hear_about_us_-b15d4232-7672-429d-81fd-a00020bddf95>*")
      .contains("Referral")
      .nextAll()
      .should("have.length", 10);
  }
  form_field(f_name, last_name, email, mobile, msg) {
    cy.get("#firstname-b15d4232-7672-429d-81fd-a00020bddf95").type(f_name);
    cy.get("#lastname-b15d4232-7672-429d-81fd-a00020bddf95").type(last_name);
    cy.get("#email-b15d4232-7672-429d-81fd-a00020bddf95").type(email);
    cy.get("#mobilephone-b15d4232-7672-429d-81fd-a00020bddf95").type(mobile);
    cy.get("#message-b15d4232-7672-429d-81fd-a00020bddf95").type(msg);
    cy.get("input[value='Send Message >']").click();
  }
  top_button_validation() {
    cy.scrollTo("bottom");
    cy.wait(2000);
    cy.xpath("//a[contains(@href,'#top')]").click();
    cy.wait(4000);
    cy.get(
      ".contact__hero.d-flex.justify-content-center.align-items-center"
    ).should("be.visible");

    // cy.window().should((win) => {
    //   expect(win.scrollY).to.eq(0);
    // });
  }
}
export default contact_us_po;
