import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators';
import { SearchResults } from '@/types';
import { search } from '@/api/search-api-service';

@Module({ namespaced: true, name: 'search' })
class SearchStore extends VuexModule {
  searchQuery = '';
  searchResults: SearchResults = {
    users: [],
    topics: [],
    stories: [],
  }

  @Mutation
  SET_SEARCH_QUERY(query: string) {
    this.searchQuery = query;
  }

  @Mutation
  SET_SEARCH_RESULTS(results: SearchResults) {
    this.searchResults = results;
  }

  @Action
  async search(query: string) {
    this.context.commit('SET_SEARCH_QUERY', query);
    try {
      const searchResults = await search(query);
      this.context.commit('SET_SEARCH_RESULTS', searchResults);
    } catch (error) {
      console.log('An error occurred during the search', error);
    }
  }

}

export default SearchStore;