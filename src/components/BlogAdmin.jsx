import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { isAuthorizedAdmin } from '../utils/adminAccess';

const emptyForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: 'Insights',
  status: 'published',
  keywords: '',
  meta_description: '',
  featured_image: '',
  image_alt: '',
  schema_type: 'Article'
};

export default function BlogAdmin() {
  const navigate = useNavigate();
  const [sessionUser, setSessionUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [activeTab, setActiveTab] = useState('editor'); // 'editor' | 'preview'

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/portal');
        return;
      }

      const isAdmin = await isAuthorizedAdmin(session.user.email);

      if (!isAdmin) {
        navigate('/portal');
        return;
      }

      setSessionUser(session.user);
      setAuthorized(true);
      await fetchPosts();
      setLoading(false);
    };

    load();
  }, [navigate]);

  const fetchPosts = async () => {
    const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    if (data) setPosts(data);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const htmlText = event.target.result;
      
      // Parse HTML tags
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');

      // Extract Title
      const titleTag = doc.querySelector('title')?.innerText;
      const h1Tag = doc.querySelector('h1')?.innerText;
      const extractedTitle = titleTag || h1Tag || file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");

      // Extract Meta Description & Keywords
      const metaDesc = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      const metaKeys = doc.querySelector('meta[name="keywords"]')?.getAttribute('content') || '';
      
      // Extract Body Content (or whole file if no body tag)
      const bodyContent = doc.body && doc.body.innerHTML.trim() ? doc.body.innerHTML : htmlText;

      // Extract Image Alt Text
      const imgAlt = doc.querySelector('img')?.getAttribute('alt') || extractedTitle;

      // Extract text excerpt
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = bodyContent;
      const textOnly = tempDiv.textContent || tempDiv.innerText || '';
      const excerpt = textOnly.slice(0, 180).trim() + '...';

      // Auto-generate slug
      const generatedSlug = extractedTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      setForm((prev) => ({
        ...prev,
        title: extractedTitle,
        slug: prev.slug || generatedSlug,
        excerpt: prev.excerpt || excerpt,
        content: bodyContent,
        meta_description: prev.meta_description || metaDesc,
        keywords: prev.keywords || metaKeys,
        image_alt: prev.image_alt || imgAlt
      }));

      setMessage({ type: 'success', text: `HTML File "${file.name}" imported successfully!` });
    };

    reader.readAsText(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    const payload = {
      title: form.title,
      slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      excerpt: form.excerpt,
      content: form.content,
      category: form.category,
      status: form.status,
      keywords: form.keywords,
      meta_description: form.meta_description,
      featured_image: form.featured_image,
      image_alt: form.image_alt || form.title,
      schema_type: form.schema_type,
      updated_at: new Date().toISOString()
    };

    if (editingId) {
      const { error } = await supabase.from('blog_posts').update(payload).eq('id', editingId);
      if (error) {
        setMessage({ type: 'error', text: error.message });
        setSaving(false);
        return;
      }
    } else {
      const { error } = await supabase.from('blog_posts').insert([{ ...payload, created_at: new Date().toISOString() }]);
      if (error) {
        setMessage({ type: 'error', text: error.message });
        setSaving(false);
        return;
      }
    }

    setForm(emptyForm);
    setEditingId(null);
    setMessage({ type: 'success', text: editingId ? 'Article updated successfully.' : 'Article published successfully.' });
    await fetchPosts();
    setSaving(false);
  };

  const handleEdit = (post) => {
    setEditingId(post.id);
    setForm({
      title: post.title || '',
      slug: post.slug || '',
      excerpt: post.excerpt || '',
      content: post.content || '',
      category: post.category || 'Insights',
      status: post.status || 'published',
      keywords: post.keywords || '',
      meta_description: post.meta_description || '',
      featured_image: post.featured_image || '',
      image_alt: post.image_alt || post.title || '',
      schema_type: post.schema_type || 'Article'
    });
    setActiveTab('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleStatus = async (post) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published';
    const { error } = await supabase.from('blog_posts').update({ status: newStatus }).eq('id', post.id);
    if (!error) {
      setMessage({ type: 'success', text: `Article "${post.title}" set to ${newStatus}.` });
      await fetchPosts();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this article permanently?')) return;
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (!error) {
      setMessage({ type: 'success', text: 'Article deleted.' });
      await fetchPosts();
    }
  };

  const contentWordCount = useMemo(() => {
    const words = (form.content || '').trim().split(/\s+/).filter(Boolean);
    return words.length;
  }, [form.content]);

  if (loading) return <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center">Loading blog manager…</div>;
  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-[#020202] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Header Navigation */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs uppercase tracking-[0.25em] font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Editorial Suite
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight">Manage Blog Articles</h1>
            <p className="text-gray-400 mt-2 max-w-2xl">Publish articles, upload HTML blog files, edit metadata, and manage your SEO publication pipeline.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/blog" target="_blank" className="text-xs font-semibold px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition-all">
              View Public Blog ↗
            </Link>
            <Link to="/admin" className="text-xs font-semibold px-4 py-2 rounded-full border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 transition-all">
              ← Root Admin
            </Link>
          </div>
        </div>

        {message.text ? (
          <div className={`mb-8 rounded-2xl border px-5 py-4 text-sm flex items-center justify-between ${message.type === 'error' ? 'border-red-500/30 bg-red-500/10 text-red-300' : 'border-cyan-500/30 bg-cyan-500/10 text-cyan-200'}`}>
            <span>{message.text}</span>
            <button onClick={() => setMessage({ type: '', text: '' })} className="text-xs opacity-70 hover:opacity-100">✕ Close</button>
          </div>
        ) : null}

        <div className="grid gap-8 xl:grid-cols-[1.3fr_0.8fr]">
          
          {/* Main Form & Upload Area */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8 backdrop-blur-xl space-y-6">
            
            {/* HTML Upload Banner */}
            <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <span>📄</span> Import HTML Blog File
                  </h3>
                  <p className="text-xs text-gray-300 mt-1">Upload any HTML document. Title, meta description, and article content will be auto-extracted.</p>
                </div>
                <label className="cursor-pointer inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-cyan-500 text-black text-xs font-bold hover:bg-cyan-400 transition-all whitespace-nowrap">
                  <span>Upload .HTML File</span>
                  <input type="file" accept=".html,.htm,.txt" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            </div>

            {/* Tab Controls */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('editor')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'editor' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-gray-400 hover:text-white'}`}
                >
                  HTML Editor
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'preview' ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40' : 'text-gray-400 hover:text-white'}`}
                >
                  Live Article Preview
                </button>
              </div>
              <span className="text-xs text-gray-400">{contentWordCount} words</span>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {activeTab === 'editor' ? (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="title" className="text-xs font-semibold text-gray-400 mb-2 block uppercase tracking-wider">Article Title *</label>
                      <input id="title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Scaling E-Commerce Operations with Automated Systems" className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none" />
                    </div>
                    <div>
                      <label htmlFor="slug" className="text-xs font-semibold text-gray-400 mb-2 block uppercase tracking-wider">URL Slug (Auto-generated)</label>
                      <input id="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="scaling-ecommerce-operations" className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none font-mono" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="excerpt" className="text-xs font-semibold text-gray-400 mb-2 block uppercase tracking-wider">Excerpt / Summary</label>
                    <textarea id="excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} placeholder="A short 1-2 sentence preview displayed on card grids..." className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none" />
                  </div>

                  <div>
                    <label htmlFor="content" className="text-xs font-semibold text-gray-400 mb-2 block uppercase tracking-wider">Article HTML Content *</label>
                    <textarea id="content" required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={12} placeholder="Paste or type raw HTML article content (<p>, <h2>, <ul>, etc.)..." className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none font-mono" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="category" className="text-xs font-semibold text-gray-400 mb-2 block uppercase tracking-wider">Category</label>
                      <input id="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. AI Automation, Insights, Reseller" className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none" />
                    </div>
                    <div>
                      <label htmlFor="status" className="text-xs font-semibold text-gray-400 mb-2 block uppercase tracking-wider">Publication Status</label>
                      <select id="status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none">
                        <option value="published">Published (Live on site)</option>
                        <option value="draft">Draft (Admin review only)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="keywords" className="text-xs font-semibold text-gray-400 mb-2 block uppercase tracking-wider">SEO Keywords</label>
                      <input id="keywords" value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })} placeholder="ai automation, business systems" className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none" />
                    </div>
                    <div>
                      <label htmlFor="featured_image" className="text-xs font-semibold text-gray-400 mb-2 block uppercase tracking-wider">Featured Image URL</label>
                      <input id="featured_image" value={form.featured_image} onChange={(e) => setForm({ ...form, featured_image: e.target.value })} placeholder="https://example.com/banner.jpg" className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none" />
                    </div>
                    <div>
                      <label htmlFor="image_alt" className="text-xs font-semibold text-gray-400 mb-2 block uppercase tracking-wider">Image Alt Text (SEO & Accessibility)</label>
                      <input id="image_alt" value={form.image_alt} onChange={(e) => setForm({ ...form, image_alt: e.target.value })} placeholder="Descriptive image text for screen readers & Google..." className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="meta_description" className="text-xs font-semibold text-gray-400 mb-2 block uppercase tracking-wider">Meta Description (Search Engines)</label>
                    <textarea id="meta_description" value={form.meta_description} onChange={(e) => setForm({ ...form, meta_description: e.target.value })} rows={2} placeholder="Compelling 150-character meta description for Google search results..." className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none" />
                  </div>
                </>
              ) : (
                /* Live Preview Mode */
                <div className="space-y-6 bg-black/40 border border-white/10 rounded-2xl p-6">
                  <div className="border-b border-white/10 pb-4">
                    <span className="text-xs text-cyan-300 uppercase tracking-[0.25em] font-semibold">{form.category || 'Article'}</span>
                    <h2 className="text-3xl font-bold mt-2 text-white">{form.title || 'Untitled Article'}</h2>
                    {form.excerpt && <p className="text-gray-400 text-sm mt-2 italic">{form.excerpt}</p>}
                  </div>
                  {form.featured_image && (
                    <img src={form.featured_image} alt={form.image_alt || form.title} className="w-full h-64 object-cover rounded-xl border border-white/10" />
                  )}
                  <div 
                    className="blog-prose"
                    dangerouslySetInnerHTML={{ __html: form.content || '<p className="text-gray-500 italic">No HTML content provided yet.</p>' }}
                  />
                </div>
              )}

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <button type="submit" disabled={saving} className="rounded-full bg-cyan-400 px-6 py-3 font-bold text-black hover:bg-cyan-300 transition-all cursor-pointer shadow-[0_0_20px_rgba(56,182,255,0.3)]">
                  {saving ? 'Saving Article…' : editingId ? 'Update Article' : 'Publish Article'}
                </button>
                {editingId ? (
                  <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }} className="rounded-full border border-white/20 bg-white/5 px-5 py-3 font-semibold text-gray-300 hover:bg-white/10 transition-all">
                    Cancel Editing
                  </button>
                ) : null}
              </div>
            </form>
          </div>

          {/* Content Library Sidebar */}
          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Content Library</h2>
                <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-gray-300 font-semibold">{posts.length} Articles</span>
              </div>
              
              <div className="space-y-3 max-h-[750px] overflow-y-auto pr-1">
                {posts.length === 0 ? (
                  <p className="text-gray-400 text-sm py-4 text-center border border-dashed border-white/10 rounded-2xl">No articles published yet. Fill out the form or upload an HTML file to publish your first post!</p>
                ) : (
                  posts.map((post) => (
                    <div key={post.id} className="rounded-2xl border border-white/10 bg-black/60 p-4 space-y-3 hover:border-white/20 transition-all">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-white text-sm line-clamp-1">{post.title}</p>
                          <p className="text-xs text-gray-400 mt-1">{post.category || 'Article'} • {new Date(post.created_at).toLocaleDateString()}</p>
                        </div>
                        <button
                          onClick={() => handleToggleStatus(post)}
                          className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-bold transition-all ${post.status === 'published' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40'}`}
                        >
                          {post.status || 'published'}
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        <Link to={`/blog/${post.slug}`} target="_blank" className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
                          View Live ↗
                        </Link>
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(post)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-200 hover:bg-white/15 transition-all">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(post.id)} className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs text-red-300 hover:bg-red-500/20 transition-all">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
