<script>
    import "../app.css";
</script>
  
<main>
    <navbar>
        <div>
            <object type="image/svg+xml" data="logo.svg" class="logo" title="logo" />
        </div>
    </navbar>
    <slot />
</main>


<style>

    main {
        width: 100vw;
        padding: 0px 80px 0 80px;
    }

    @media (max-width: 800px) {
        main {
            padding: 0px 20px 0 20px
        }
    }

    :global(body) {
        background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url("/background-image");
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        background-repeat: no-repeat;

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
        flex-shrink: 0;

        height: 100vh;
        width: 100vw;
    }

    navbar {
        height: 100px;
        display: flex;
        flex-direction: row;
        align-items: start;
        gap: 10px;
        align-self: stretch;
    }

    .logo {
        display: flex;
        height: 80px;
        max-width: 1280px;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 10px;
        align-self: stretch;
    }
</style>