/**
 * Create the text content of contact email
 *
 * @param {string} firstname - firstname of the person who wanted to send the email
 * @param {string} lastname  - lastname of the person who wanted to send the email
 * @param {string} email     - email address of the sender
 * @param {string} message   - message written by the sender
 *
 * @returns {string} plaintext content of the email
 */
function createContactTextContent({ firstname, lastname, email, message }) {
  return `
      "${message}"

      Message envoyé par ${firstname} ${lastname} (${email})
    `;
}

/**
 * Create the html content of contact email
 *
 * @param {string} name      - name of the person who wanted to send the email
 * @param {string} fromEmail - email address of the sender
 * @param {string} message   - content of the email
 *
 * @returns {string} html content of the email
 */
function createContactHtmlContent({ firstname, lastname, email, message }) {
  return `
      <div style="font-size: 16px">
        <span style="font-style: italic">"${message}"</span>
        <div style="margin-top: 10px">
          Message envoyé par <strong>${firstname} ${lastname} (${email})</strong>
        </div>
      </div>
    `;
}

/**
 * Create the text content of presence email
 *
 * @param {string} firstname  - firstname of the person who wanted to send the email
 * @param {string} lastname   - lastname of the person who wanted to send the email
 * @param {string} presence   - whether the sender will be present or not
 * @param {string} nbAdults   - number of adults in group
 * @param {string} nbChildren - number of children in group
 * @param {string} message    - added message with specifications if needed
 *
 * @returns {string} plaintext content of the email
 */
function createPresenceTextContent({
  firstname,
  lastname,
  presence,
  nbAdults,
  nbChildren,
  message,
}) {
  const presenceText = presence ? 'sera présent' : 'ne pourra malheureusement pas être présent';

  let content = `${firstname} ${lastname} ${presenceText} pour le mariage.`;

  if (presence) {
    if (nbAdults) content += `Nombre d'adulte${nbAdults > 1 ? 's' : ''}: ${nbAdults}`;
    if (nbChildren) content += `Nombre d'enfant${nbChildren > 1 ? 's' : ''}: ${nbChildren}`;
    if (message) content += `Message: ${message}`;
  }

  return content;
}

/**
 * Create the html content of presence email
 *
 * @param {string} firstname  - firstname of the person who wanted to send the email
 * @param {string} lastname   - lastname of the person who wanted to send the email
 * @param {string} presence   - whether the sender will be present or not
 * @param {string} nbAdults   - number of adults in group
 * @param {string} nbChildren - number of children in group
 * @param {string} message    - added message with specifications if needed
 *
 * @returns {string} html content of the email
 */
function createPresenceHtmlContent({
  firstname,
  lastname,
  presence,
  nbAdults,
  nbChildren,
  message,
}) {
  const presenceText = presence ? 'sera présent' : 'ne pourra malheureusement pas être présent';

  let content = `<div style="font-size: 16px">
      <div><strong>${firstname} ${lastname}</strong> ${presenceText} pour le mariage.</div>
    `;

  if (presence) {
    if (nbAdults)
      content += `<div style="margin-top: 10px">
        <strong>Nombre d'adulte${nbAdults > 1 ? 's' : ''}</strong>: ${nbAdults}
        </div>`;

    if (nbChildren)
      content += `<div style="margin-top: 10px">
      <strong>Nombre d'enfant${nbChildren > 1 ? 's' : ''}</strong>: ${nbChildren}
      </div>`;

    if (message)
      content += `<div style="margin-top: 10px">
        <strong>Message</strong>: <span style="font-style: italic">"${message}"</span>
        </div>`;
  }

  content += '</div>';
  return content;
}

module.exports = {
  contact: {
    createTextContent: createContactTextContent,
    createHtmlContent: createContactHtmlContent,
  },
  presence: {
    createTextContent: createPresenceTextContent,
    createHtmlContent: createPresenceHtmlContent,
  },
};
