<template>
	<div id="student-list">
    <h1>student List </h1>
			<form>
          <div class="form-group">
            <label for="email">Mail</label>
            <input
              type="text"
              id="email"
              class="form-control"
              :value="userData.email"
              @input="userData.email = $event.target.value"
            />
          </div>
            <div>

          <button class="btn btn-primary" @click.prevent="submitted">
            Submit!
          </button>
            </div>
    
      </form>
		</div>
	</div>
</template>

<script>
export default {};
</script>
