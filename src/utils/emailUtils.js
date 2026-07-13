export async function sendHandoverEmail(settings, projectData, doors) {
  if (!settings.emailJsServiceId || !settings.emailJsTemplateId || !settings.emailJsPublicKey) {
    throw new Error('Please configure EmailJS settings first');
  }

  // Load emailjs from CDN since local install may be incomplete
  let emailjs;
  try {
    const mod = await import('https://cdn.jsdelivr.net/npm/@emailjs/browser@4/+esm');
    emailjs = mod.default ?? mod;
  } catch (e) {
    throw new Error('EmailJS could not be loaded. Check your internet connection.');
  }

  const doorList = doors.map((d, i) => `${i + 1}. ${d.name} (${d.equipments.length} items)`).join('\n');

  const templateParams = {
    to_email: settings.recipientEmail || '',
    project_name: projectData.projectName,
    client_name: projectData.clientName,
    order_no: projectData.orderNo,
    tech_name: projectData.techName,
    door_count: doors.length,
    door_list: doorList,
    company_name: settings.companyName || projectData.contractor,
  };

  return emailjs.send(
    settings.emailJsServiceId,
    settings.emailJsTemplateId,
    templateParams,
    settings.emailJsPublicKey
  );
}
