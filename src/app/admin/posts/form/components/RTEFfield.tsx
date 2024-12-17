


import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { UseFormPostsContext } from '../context/postsFormContext';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const modules = {
    toolbar: {
        container: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ size: ['extra-small', 'small', 'medium', 'large'] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image', 'video'],
            [{ color: [] }, { background: [] }],
            ['clean'],
        ],
    },
};

export function RTEField() {
    const { data, handleData } = UseFormPostsContext()!;

    const handleChange = (value: string) => {
        handleData('content', value);
    };

    return (
        <div>
            <ReactQuill
                value={data?.content}
                onChange={handleChange}  
                modules={modules}
                placeholder="Enter your content here..."
            />
        </div>
    );
}