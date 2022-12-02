<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<script>

	/** @type {import('./$types').PageData} */
	import { paginate, DarkPaginationNav } from 'svelte-paginate'
	import { urlFor } from './sanityClient';

	export let data;	

	let news = data.props.news;
	let category = data.props.category;
	// filter variables
	let filterCategory= "";
	let filterNews = news;
	let sortNews = news;
	// pagintation
	let items = filterNews;
	let currentPage = 1
  	let pageSize = 6
 	$: paginatedItems = paginate({ items, pageSize, currentPage })

	// sort
	function delphabeticSort(){
		  sortNews = news.sort( function(a, b){
			if (a.name.toLowerCase() > b.name.toLowerCase()){
				return -1;
		} 
		})
	}
	function alphabeticSort(){
		 sortNews = news.sort( function(a, b){
			if (a.name.toLowerCase() <b.name.toLowerCase()){
				return -1;
		 	} 
		})
	}
	// filter
    function filtering(){
		filterNews = news.filter(function(el){return el.category.categoryName == filterCategory})
		
	}
   function resetFilter(){
	items = news;
	filterNews = news;
	sortNews = news;
   }

   function final(){
   		let finalyNews =sortNews.filter(item => filterNews.includes(item));
   		items = finalyNews;
   }
  </script>


<section class="section">
	<div class="container ">
		<div class="filter-wrap">
			
			<h3>Filter by </h3>
			<h3> {filterCategory}</h3>
			
			<button class="filter-btn"  on:click={resetFilter} on:click="{() => currentPage = 1}" on:click="{() => filterCategory = ''}"  >All</button>
			{#each category  as {categoryName}}
			<button class="filter-btn" on:click="{() => filterCategory = categoryName}" on:click={filtering} on:click="{() => currentPage = 1}" on:click={final}>{categoryName} </button>
				 <!-- content here -->
			{/each}
			<div class="sort-wrp">
			
			
				<details class="sort-drp">
					<summary>Sort</summary>
					<button class='sort-btn' on:click={alphabeticSort} on:click="{() => currentPage = 1}" on:click={final} >A-Z</button>
					<button class='sort-btn' on:click={delphabeticSort } on:click="{() => currentPage = 1}" on:click={final}>Z-A</button>
				</details>
				
			</div>
		</div>
		<div class="content-wrapper">
			<div class="content">
			{#each paginatedItems as item}
				<div class="card-wrp">
					<div class="card">
						<img class="card-image" src={urlFor(item.image).url()} alt="blog">
						<div class="card-content">
							<h4 class="card-category">{item.category.categoryName}</h4>
							<h3 class="card-title">{item.name}</h3>
							<p class="card-description">{item.previewTxt}</p>
							<a href="{'/news/'+item._id}" class='card-link'>Learn More </a>
						</div>
					</div>
				</div>
			{/each}
			</div>
			<DarkPaginationNav
  				totalItems="{items.length}"
  				pageSize="{pageSize}"
  				currentPage="{currentPage}"
  				limit="{1}"
  				showStepOptions="{true}"
  				on:setPage="{(e) => currentPage = e.detail.page}"
			/>
	  	</div>
		 
	</div>
</section>
<style>

.sort-drp{
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
}

.filter-wrap{
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 10px;
	margin-right: 40px;
	border-radius: 15px;
}
.filter-btn{
	background-color: transparent;
	min-width: 100px;
	padding: 10px;
	border: 1px solid #35C66B;
	border-radius: 15px;
	color: #35C66B;
	cursor: pointer;
	font-size: 18px;
	font-weight: 500;
	text-transform: capitalize;
	transition: all .3s;
	
}

.filter-btn:hover{
	border-color: #fff;
	color: #fff;
	box-shadow: 0 4px 20px #ffffff25;
}

.card-wrp{
	width: 30%;
	height: 400px;
}
.card{
	border: #35C66B 1px solid ;
	border-radius: 10px;
	overflow: hidden;
	box-shadow: 0 4px 44px #35C66B25;
	height: 100%;
	transition: all .3s ease-out;
}
.card:hover{
	border: #fff 1px solid;
	box-shadow: 0 4px 44px #ffffff25;
}
.card-image{
	max-width: 100%;
	max-height: 40%;
	height: 40%;
	width: 100%;
	object-fit: cover;
}
.card-content{
	padding: 10px;
}
.card-category{
	margin-bottom: 10px;
	color: #35C66B;
	font-weight: 400;
	font-size: 18px;
	
}
.card-title{
	margin-bottom: 10px;
	color: #fff;
	font-size: 20px;
	font-weight: 600;
}
.card-description{
	font-size: 16px;
	margin-bottom: 10px;
}
.card-link{
	color: #35C66B;
}
.card-link:hover{
	color:#fff;
}

.content{
	display: flex;
	gap: 30px;
	flex-wrap: wrap;
	width: 1100px;
	margin-bottom: 40px;
}
.container{
	padding: 50px 0 50px 0;
	align-items: flex-start;
	justify-content: space-between;
}
.sort-wrp{
	width: 100%;
	max-width: 100px;
	display: flex;
	flex-direction: column;
	gap: 20px;
	
}
.sort-btn{
	width: 100%;
	background-color: transparent;
	border: #35C66B 1px solid;
	padding: 10px;
	color: #35C66B;
	border-radius: 10px;
	text-transform: uppercase;
	cursor: pointer;
	margin: 10px 0px;

}
summary{
	cursor: pointer;
	color: #35C66B;
	font-weight: 600;
	font-size: 20px;
	transition: all .3s;

}
summary:hover{

	color: #fff;

}
.sort-btn:hover{
	border-color: #fff;
	color: #fff;
	box-shadow: 0 4px 20px #ffffff25;
}

@media screen and (max-width: 1440px) and (min-width:860px) {
    .content{
		gap: 20px;
		width: 100%;
	}
	.content-wrapper {
		width: 100%;
	}
	.card-wrp{
		width: auto;
		max-width: 45%;
		height: 500px;
	}
}
@media screen and (max-width: 860px){
	.content{
		gap: 20px;
		width: 100%;
		
	}
	.card-wrp{
		width: 100%;
		max-width: 600px;
		height: 500px;
	}
	.filter-wrap{
		margin-right: 20px;
		padding: 0;
	}
	.filter-btn{
		max-width: 100px;
		min-width: auto;
		font-size: 16px;
	}
	summary{
		font-size: 16px;
		min-width: 80px;
	}
}
</style>