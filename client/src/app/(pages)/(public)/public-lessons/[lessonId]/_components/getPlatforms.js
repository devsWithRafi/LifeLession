import {
  FaFacebook,
  FaPinterest,
  FaLinkedin,
  FaXTwitter,
  FaWhatsapp,
  FaTelegram,
} from 'react-icons/fa6';

export const getPlatforms = (url, title) => [
  {
    label: 'Facebook',
    icon: FaFacebook,
    href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
  },
  {
    label: 'X',
    icon: FaXTwitter,
    href: `https://x.com/intent/tweet?url=${url}&text=${encodeURIComponent(title)}`,
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    icon: FaLinkedin,
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
  },
  {
    label: 'Pinterest',
    icon: FaPinterest,
    href: `https://pinterest.com/pin/create/button/?url=${url}&description=${encodeURIComponent(title)}`,
  },
  {
    label: 'WhatsApp',
    icon: FaWhatsapp,
    href: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
  },
  {
    label: 'Telegram',
    icon: FaTelegram,
    href: `https://t.me/share/url?url=${url}&text=${encodeURIComponent(title)}`,
  },
];
