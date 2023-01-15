/// <reference types="cypress" />
import { it } from "mocha";
import contact_us_po from "../../support/pageObjects/contacUs/contact_us_po";
describe("Contact_us_form", () => {
  const contact_us = new contact_us_po();
  before(function () {
    cy.fixture("example").then(function (data) {
      // this.data = data;
      globalThis.data = data;
    });
  });
  beforeEach(() => {
    contact_us.visitContactus();
  });

  /** Scenario; verify/validate if user landing on right page or not (authenticating title & url of app)  */
  it("validate title & url", () => {
    contact_us.title_validation();
    contact_us.url_validation();
  });
  /** validate if user directly click on send msg button without any input */
  it("click on send_msg directly ", () => {
    // this click_btn function will assert btn should be visible,clickable & click on it & then record following behaviour
    contact_us.click_btn();

    // below function will validate there should be error class in dom if user click on submit button directly
    contact_us.error_ui();
    //  asserting error msg on ui if user click submit directly (frontend validation)
    contact_us.error_text();
    //  console msg.
    cy.log("button should not be enable if there is not input in form.");
  });
  /** validate if user enter invalid input
   * in first_name & last_name
   *  (front_end validation should be there but not found error so this is issue*/
  it("invalid input on first & last name", () => {
    contact_us.form_field(
      data.invalid_f_name,
      data.invalid_last_name,
      data.valid_email,
      data.valid_m_no,
      data.msg
    );
    //  error text should be there on ui if enter any wrong format
    contact_us.error_text();
  });
  it("invalid email should throw an error", () => {
    contact_us.form_field(
      data.valid_f_name,
      data.valid_last_name,
      data.invalid_email,
      data.valid_m_no,
      data.msg
    );
    contact_us.invalid_email_error_text();
  });

  /** validate/verify 
   * if user enter invalid mobile no. in field
   * & record behaviour if frontend throw an error
   * or not
   * its not throwing any error so its issue its expecting less then 10 digit as well.
  
   */
  it("if user enter invlid mobile_no", () => {
    contact_us.form_field(
      data.valid_f_name,
      data.valid_last_name,
      data.valid_email,
      data.invalid_m_no,
      data.msg
    );
    contact_us.invalid_mobile_no_validation();
  });

  /**
   * verify/validate if user can see all
   * option(How did you hear about us )
   * dropdown...
   * & chk how many option length is there.
   *
   */

  it("how did you hear about us options", () => {
    contact_us.validate_hear_from_us_option();
  });

  it("happyflow", () => {
    contact_us.form_field(
      data.valid_f_name,
      data.valid_last_name,
      data.valid_email,
      data.valid_m_no,
      data.msg
    );

    cy.log(
      "due to recaptcha can't proceed further through cypress rest is througly tested"
    );
  });

  it("top button opereation validation", () => {
    contact_us.top_button_validation();
  });
});
