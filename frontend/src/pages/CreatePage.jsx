import { useState } from "react";
import { Link,  useNavigate } from "react-router";
import { ArrowLeftIcon, Cone } from "lucide-react";
import toast from 'react-hot-toast';
import axios from 'axios';


const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!title.trim() || !content.trim()){
        toast.error('All fields required');
        return;
    }
    setLoading(true);
    try {
        await axios.post('http://localhost:3000/api/notes', {
            title,
            content 
        });
        toast.success('Note has been created successfully');
        navigate('/');
    } catch (error) {
        toast.error('Error creating the note', error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" /> Back to notes
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="write a title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <input
                    type="text"
                    placeholder="write your contents"
                    className="input input-bordered"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="card-actions justify-start">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
