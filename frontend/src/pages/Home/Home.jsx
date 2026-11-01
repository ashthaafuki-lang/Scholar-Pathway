import styles from './Home.module.css'

export default function Home() {
    return(
        <div>
            <nav className={styles.navbar}>
                <div>img</div>
                <div className={styles.navbar__title}>Scholar Pathway</div>
                
               <a href="/">Home</a>
               <a href="/Course">Courses</a>
               <a href="/contact">Contact</a>
               <a href="/Profile">Profile</a>
               <a href="/Login">Login</a>
               <a href="/Register">Register</a>
            </nav>

        {/*first page orange color set */}

        <div className={styles.firstPage}>
        <br></br>
        <center>
            <p className={styles.description}>
                <h2>Your Future Starts Here</h2>

                Explore the best education and career pathways after O/L or A/L. Find courses,universities,scholarships and more - all in one place.
            </p>

            
       <div className={styles.searchForm}>
               <h6 className={styles.h6}>Your Pathways</h6>
               
                <br></br> 
             
        
                <div class="search-row">
                    <input id="course" type="text" placeholder="Type Your course" ></input>  
                    <button type="submit">Submit</button>
                    </div>
            </div>
        </center>
            <br></br>
         </div>
        
       <p className={styles.ExploreOurPathways}>
        <h1>Explore Our Pathways</h1> 
       For Lankan A/L and O/L school student and leavers. </p>

        <div className={styles.ExploreOurPathwayspathway}>
        <div className= {styles.grid}>
        <a className={styles.card} href=""> 
        <h3>Universities</h3> 
        <p>Find your affordable school for Lanka</p>
        </a>
        </div>

        <div className= {styles.grid}>
        <a className={styles.card} href=""> 
        <h3>Private Institutes</h3> 
        <p>Explore private university and instutes offering diverse professional streams </p>
        </a>
        </div>

        <div className= {styles.grid}>
        <a className={styles.card} href=""> 
        <h3>VTA & DTET</h3> 
        <p>Technical and vocational education opportunities for hands-on careers</p>
        </a>
        </div>

        <div className= {styles.grid}>
        <a className={styles.card} href=""> 
        <h3>Scholarships</h3> 
        <p>Get financial support to fund your education journey</p>
        </a>
        </div>

        <div className= {styles.grid}>
        <a className={styles.card} href=""> 
        <h3>Foreign Education</h3> 
        <p>Study abroad and explore international university programs</p>
        </a>
        </div>

        <div className= {styles.grid}>
        <a className={styles.card} href=""> 
        <h3>Free Courses</h3> 
        <p>Learn for free,anywhere </p>
        </a>
        </div>

        <div className= {styles.grid}>
        {/* <a className={styles.card} href="">  */}
        <h3>Private Institutes</h3>
        </div>

            <div className={styles.pathways}>
                <div className={styles.pathway}>
                    <h3>Engineering</h3> 
                    <p>Explore the world of engineering and discover the endless possibilities it offers. From designing innovative solutions to building cutting-edge technology, engineering is a field that shapes the future.</p>
                </div>
                <div className={styles.pathway}>
                    <h3>Medicine</h3>
                    <p>Discover the fascinating world of medicine and healthcare. From diagnosing illnesses to developing life-saving treatments, medicine is a field that requires dedication, compassion, and a thirst for knowledge.</p>
                </div>
                <div className={styles.pathway}>
                    <h3>Business</h3>
                    <p>Explore the dynamic world of business and entrepreneurship. From managing finances to developing marketing strategies, business is a field that requires creativity, innovation, and a keen understanding of the market.</p>
                </div>
            </div> 
                     
        <div className={styles.footer}>

            <h2>Not sure what to do next?</h2>
            <br></br>
            <p>Let Scholar Pathway guide you to the right path</p>
            <br />
            <a class={styles.ExploreNow} href="/course">Explore Now- </a>
            
    </div>
       </div>
       </div>

        
    )
}

