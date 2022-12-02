<script>
/** @type {import('./$types').PageData} */
import {urlFor} from '../../sanityClient';
import {PortableText} from '@portabletext/svelte'
export let data;

let obj = data.props.res

const {name, image, description, _id} = obj

</script>

<section>
    <div class="container">
        <div class="content">
            <div class="card">
                <img class="card-img" src={urlFor(image).url()} alt="">
                <div class="card-txt">
                    <div class="card-name"> {name}</div>
                        <div class="rich-text">
                        <PortableText value={description}/>
                    </div>
                    
                </div>
            </div> 
        </div>
    </div>
</section>

<style>
.content {
    display: flex;
    justify-content: space-between;
    margin-top: 60px;
   
    border-radius: 20px;
    overflow: hidden;
    padding: 40px;
}

.card {
    position: relative;
    display: flex;
    width: 100%;
    min-height: 400px;
    box-shadow: 0 4px 44px #35C66B25;
    border-radius: 10px;
    overflow: hidden;
    flex-direction: column;
}

.card-img {
    width: 100%;
    max-width: 1360px;
    ;
    object-fit: cover;
}

.card-txt {
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.card-name {
    font-size: 1.5rem;
    font-weight: 600;
    text-transform: capitalize;
    margin-bottom: 10px;
}


</style>
