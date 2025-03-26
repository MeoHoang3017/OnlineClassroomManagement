import authorApi from './baseAPI/authorAPI';
import uploadFileBase from './baseAPI/uploadAPI';

const FileAPI = {
    // Upload single file
    uploadFile: async (lessonId: string, file: File) => {
        const formData = new FormData();
        formData.append('lessonId', lessonId); // Append lessonId to formData
        formData.append('file', file); // Append the file
        console.log('Uploading single file:', formData.get('file')); // Debugging
        return await uploadFileBase('/files/upload', formData); // Use uploadFileBase
    },

    // Upload multiple files
    uploadFiles: async (lessonId: string, files: File[]) => {
        const formData = new FormData();
        formData.append('lessonId', lessonId); // Append lessonId to formData
        files.forEach((file) => {
            formData.append('files', file); // Append each file
        });
        console.log('Uploading multiple files:', [...formData]); // Debugging
        return await uploadFileBase('/files/upload/multiple', formData); // Use uploadFileBase
    },

    // Download single file
    downloadFile: (fileId: string) =>
        authorApi.get(`/files/download/${fileId}`, { responseType: 'blob' }).then(response => response.data),

    // Download multiple files (fetch download links for a lesson)
    downloadFiles: (lessonId: string) =>
        authorApi.get(`/files/download/lesson/${lessonId}`, { responseType: 'blob' }).then(response => response.data),
};

export default FileAPI;