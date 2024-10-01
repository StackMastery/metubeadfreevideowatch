// Apis Config 
const youTubeApi = "AIzaSyCYAjy7Yby233keYW1aTN2YC5kV38_EvjI"; // Youtube Data API Key
const filterInput = document.querySelectorAll('.filterInput'); // All Filters
const searchForm = document.getElementById('searchForm'); // Search Form
const videoModal = document.getElementById('videoModal'); // videoModal
const closeVideo = document.getElementById('closeVideo'); //  Video Modal CLose Button
const search = document.getElementById('search'); // Search Bar
const videoEmbed = document.getElementById('videoEmbed'); // Video Embed

filterInput.forEach((items, index) => {
    filterInput[index].addEventListener("input", function() {
        fetchVideos(filterInput[index].value)
    });
});

searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    fetchVideos(search.value)
})

const fetchVideos = (query) => {
    const fetchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${query}&type=video&key=${youTubeApi}`;
    fetch(fetchUrl)
        .then(response => response.json())  // Parse JSON correctly
        .then(videoJson => {
            console.log(videoJson)
            const demojson = document.getElementById('demojson');
            const videoTitle = videoJson.items;
            if(videoJson.error){
                demojson.innerHTML = `<h1 class="text-center text-2xl w-full col-span-12 pt-20">Daliy Video Limit Is Crossed ❌</h1>`
            }
            
            demojson.innerHTML = videoTitle.map(video => {
                return `
                    <div class="col-span-12 md:col-span-3 flex flex-col gap-3" id="video">
                        <a class="cursor-pointer" onclick="openVideo('${video.id.videoId}')"> <!-- Pass videoId as string -->
                            <img class="rounded-2xl border border-[#ffffff50] object-fill" src="${video.snippet.thumbnails.high.url}" alt="">
                            <div class="mt-5">
                                <h2>${video.snippet.title}</h2>
                                <span class="flex w-full h-[1px] bg-[#ffffff50] mt-5"></span>
                            </div>
                        </a>
                        <p><strong>By</strong> <a href="https://www.youtube.com/channel/${video.snippet.channelId}" class="hover:text-red-300">${video.snippet.channelTitle}</a></p>
                    </div>
                `;
            }).join('');
        })
        .catch(error => console.error('Error fetching data:', error));
}

fetchVideos("Javascript");

const openVideo = (videoId) => {
    videoModal.style.display = 'flex'
    videoEmbed.innerHTML = `<iframe id="videoElement" class="border border-primary " width="560" height="315" 
                                src="https://www.youtube.com/embed/${videoId}" 
                                title="YouTube video player" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen>
                            </iframe>`
}
closeVideo.addEventListener("click", function(){
    videoModal.style.display = 'none'
    videoEmbed.innerHTML = ''
})

