import type { Business } from '../data/businesses'

function getInquiryLabel(business: Business) {
  if (business.category === 'Restaurant') {
    return 'Reservation inquiry'
  }

  if (business.category === 'Farm & Resort') {
    return 'Visit inquiry'
  }

  if (business.category === 'Retail') {
    return 'Product inquiry'
  }

  return 'Business inquiry'
}

function getInquiryLine(business: Business) {
  if (business.category === 'Restaurant') {
    return 'I would like to make a reservation or dining inquiry.'
  }

  if (business.category === 'Farm & Resort') {
    return 'I would like to ask about visiting, booking, or availability.'
  }

  if (business.category === 'Retail') {
    return 'I would like to ask about product availability and pricing.'
  }

  return 'I would like to discuss a business or supply inquiry.'
}

function getWhatsAppNumber(phone: string) {
  const digits = phone.replace(/\D/g, '')

  if (digits.startsWith('977')) {
    return digits
  }

  if (digits.length === 10 && digits.startsWith('9')) {
    return `977${digits}`
  }

  return digits
}

export function getBusinessMessage(business: Business) {
  return [
    `Hello ${business.name} team,`,
    '',
    getInquiryLine(business),
    '',
    'Name:',
    'Phone:',
    'Email:',
    'Preferred date/time:',
    'Request details:',
    '',
    'Thank you.',
  ].join('\n')
}

export function getBusinessWhatsAppUrl(business: Business) {
  if (!business.phone) {
    return null
  }

  const phone = getWhatsAppNumber(business.phone)
  const text = encodeURIComponent(getBusinessMessage(business))

  return `https://wa.me/${phone}?text=${text}`
}

export function getBusinessGmailUrl(business: Business) {
  if (!business.email) {
    return null
  }

  const subject = encodeURIComponent(`${getInquiryLabel(business)} - ${business.name}`)
  const body = encodeURIComponent(getBusinessMessage(business))

  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(business.email)}&su=${subject}&body=${body}`
}
