import React, { useState } from 'react';
import { Gift, Copy, Check, MessageSquare, CreditCard, ShieldCheck } from 'lucide-react';
import type { WeddingConfig, BankAccount } from '../../types';
import { FloralDivider } from '../common/FloralOrnament';

interface DigitalEnvelopeProps {
  gift: WeddingConfig['gift'];
  onShowToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export const DigitalEnvelope: React.FC<DigitalEnvelopeProps> = ({ gift, onShowToast }) => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const copyToClipboard = async (account: BankAccount) => {
    const textToCopy = account.accountNumber;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback untuk browser lawas / non-HTTPS
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }

      setCopiedAccount(account.accountNumber);
      onShowToast(`Nomor rekening ${account.bankName} berhasil disalin!`, 'success');

      setTimeout(() => {
        setCopiedAccount(null);
      }, 3000);
    } catch (err) {
      console.error('Gagal menyalin:', err);
      onShowToast('Gagal menyalin ke papan klip. Silakan salin manual.', 'error');
    }
  };

  const whatsappUrl = `https://wa.me/${gift.whatsappNumber}?text=${encodeURIComponent(
    gift.whatsappTemplate
  )}`;

  return (
    <section id="gift" className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-3xl mx-auto text-center">
        {/* Section Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100/70 border border-gold-300/60 mb-2">
          <Gift className="w-3.5 h-3.5 text-gold-600" />
          <span className="text-[11px] font-medium tracking-widest uppercase text-gold-800">
            Tanda Kasih
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-espresso-900 font-light tracking-wide mb-2">
          Wedding Gift & Amplop Digital
        </h2>

        <p className="text-xs sm:text-sm text-espresso-600 max-w-md mx-auto mb-12 font-light">
          Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda bermaksud memberikan
          tanda kasih, kami menyediakan amplop digital di bawah ini.
        </p>

        {/* Kartu Rekening Mempelai Pria & Wanita */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mb-8 text-left">
          {/* Rekening Mempelai Pria */}
          <div className="relative p-6 sm:p-7 rounded-3xl bg-ivory-50/95 border border-gold-300/80 shadow-md backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-semibold text-gold-800 tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-gold-100/70 border border-gold-200">
                  {gift.groomBank.badge}
                </span>
                <CreditCard className="w-5 h-5 text-gold-600" />
              </div>

              <h3 className="font-serif text-lg font-bold text-espresso-900 mb-1">
                {gift.groomBank.bankName}
              </h3>

              <p className="text-xs text-espresso-500 mb-2 font-medium uppercase tracking-wider">
                Nomor Rekening:
              </p>

              <div className="p-3 rounded-xl bg-white border border-gold-200/90 shadow-inner flex items-center justify-between mb-3">
                <span className="font-mono text-base sm:text-lg font-bold text-espresso-900 tracking-wider">
                  {gift.groomBank.accountNumber}
                </span>
              </div>

              <p className="text-xs text-espresso-700">
                Atas Nama:{' '}
                <strong className="text-espresso-900 font-semibold">
                  {gift.groomBank.accountHolder}
                </strong>
              </p>
            </div>

            <button
              onClick={() => copyToClipboard(gift.groomBank)}
              className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-gold-300 bg-white hover:bg-gold-50 text-espresso-900 text-xs font-semibold tracking-wide transition shadow-sm active:scale-95"
            >
              {copiedAccount === gift.groomBank.accountNumber ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Nomor Rekening Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-gold-600" />
                  <span>Salin Nomor Rekening</span>
                </>
              )}
            </button>
          </div>

          {/* Rekening Mempelai Wanita */}
          <div className="relative p-6 sm:p-7 rounded-3xl bg-ivory-50/95 border border-gold-300/80 shadow-md backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-semibold text-gold-800 tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-gold-100/70 border border-gold-200">
                  {gift.brideBank.badge}
                </span>
                <CreditCard className="w-5 h-5 text-gold-600" />
              </div>

              <h3 className="font-serif text-lg font-bold text-espresso-900 mb-1">
                {gift.brideBank.bankName}
              </h3>

              <p className="text-xs text-espresso-500 mb-2 font-medium uppercase tracking-wider">
                Nomor Rekening:
              </p>

              <div className="p-3 rounded-xl bg-white border border-gold-200/90 shadow-inner flex items-center justify-between mb-3">
                <span className="font-mono text-base sm:text-lg font-bold text-espresso-900 tracking-wider">
                  {gift.brideBank.accountNumber}
                </span>
              </div>

              <p className="text-xs text-espresso-700">
                Atas Nama:{' '}
                <strong className="text-espresso-900 font-semibold">
                  {gift.brideBank.accountHolder}
                </strong>
              </p>
            </div>

            <button
              onClick={() => copyToClipboard(gift.brideBank)}
              className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-gold-300 bg-white hover:bg-gold-50 text-espresso-900 text-xs font-semibold tracking-wide transition shadow-sm active:scale-95"
            >
              {copiedAccount === gift.brideBank.accountNumber ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Nomor Rekening Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-gold-600" />
                  <span>Salin Nomor Rekening</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tombol Konfirmasi Bukti Transfer WhatsApp */}
        <div className="max-w-md mx-auto p-5 rounded-2xl bg-white/70 border border-gold-200/80 shadow-sm text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs text-espresso-600 mb-3 font-light">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Kirim konfirmasi setelah melakukan transfer via WhatsApp</span>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold tracking-wide transition shadow-md active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Kirim Bukti Transfer via WhatsApp</span>
          </a>

          <p className="text-[10px] text-espresso-500 mt-2 italic">
            *Tautan akan membuka obrolan resmi WhatsApp. Anda dapat melampirkan foto struk secara
            manual.
          </p>
        </div>

        <FloralDivider className="w-44 h-6 text-gold-400 mx-auto mt-14" />
      </div>
    </section>
  );
};
