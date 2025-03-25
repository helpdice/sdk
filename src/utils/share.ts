export default function shareUrl(title: string, url: string) {
    // URL encoding to ensure special characters are handled properly
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);
    const target = '_blank';
    const dimension = 'width=600,height=400'
    // Social media share URLs
    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle} ${encodedUrl}`,
        pinterest: `https://www.pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
    };

    return {
        facebook: () => window.open(shareLinks['facebook'], target, dimension),
        twitter: () => window.open(shareLinks['twitter'], target, dimension),
        linkedin: () => window.open(shareLinks['linkedin'], target, dimension),
        whatsapp: () => window.open(shareLinks['whatsapp'], target, dimension),
        pinterest: () => window.open(shareLinks['pinterest'], target, dimension)
    }
}
