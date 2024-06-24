<script lang="ts">
  import Avatar from "../lists/Avatar.svelte";
  import NoMaintainer from "../svgs/NoMaintainer.svelte";
</script>

<div class="legend">
  <h3>Legend</h3>
  <div>
    <p>Current Maintainer</p>
    <Avatar username={"sgoudham"} size={64} wxh={32} />
  </div>
  <div>
    <p>Past Maintainer</p>
    <Avatar username={"sgoudham"} size={64} wxh={32} />
  </div>
  <div>
    <p>No Maintainer</p>
    <NoMaintainer />
  </div>
</div>

<style lang="scss">
  .legend {
    height: max-content;
    display: flex;
    flex-direction: column;
    background-color: var(--mantle);
    border-radius: var(--border-radius-normal);
    padding: var(--space-xxs);
    font-size: 1.6rem;
  }

  .legend h3 {
    text-align: center;
  }

  .legend div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-sm);
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
    margin-block-end: var(--space-xxs);
  }
</style>
