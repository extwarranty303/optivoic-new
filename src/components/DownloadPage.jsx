import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function DownloadPage() {
  const { purchaseId } = useParams();
  const [status, setStatus] = useState('Preparing your secure download…');
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const { data: purchase, error: purchaseError } = await supabase
          .from('purchases')
          .select('*')
          .eq('id', purchaseId)
          .maybeSingle();

        if (purchaseError || !purchase) throw new Error('Purchase not found.');

        const { data: product } = await supabase
          .from('products')
          .select('current_file_id')
          .eq('id', purchase.template_id)
          .maybeSingle();

        if (!product?.current_file_id) throw new Error('No downloadable file is linked to this purchase yet.');

        const { data: fileMeta } = await supabase
          .from('files')
          .select('storage_path, original_filename')
          .eq('id', product.current_file_id)
          .maybeSingle();

        const { data: signedData, error: signError } = await supabase.storage
          .from('templates')
          .createSignedUrl(fileMeta.storage_path, 60, { download: fileMeta.original_filename || 'download.zip' });

        if (signError || !signedData?.signedUrl) throw new Error('Unable to generate a secure download link.');

        const link = document.createElement('a');
        link.href = signedData.signedUrl;
        link.download = fileMeta.original_filename || 'download.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setStatus('Download started.');
      } catch (err) {
        setError(err.message || 'Unable to start the download.');
        setStatus('');
      }
    };

    load();
  }, [purchaseId]);

  return (
    <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center px-6">
      <div className="max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
        <h1 className="text-2xl font-black mb-3">Secure download</h1>
        <p className="text-gray-400 mb-6">{status || error}</p>
        <Link to="/portal" className="text-cyan-400 hover:underline">Return to portal</Link>
      </div>
    </div>
  );
}
