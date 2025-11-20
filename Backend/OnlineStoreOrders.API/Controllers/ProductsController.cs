using MediatR;
using Microsoft.AspNetCore.Mvc;
using OnlineStoreOrders.Application.Orders.Commands.DeleteOrder;
using OnlineStoreOrders.Application.Products.Commands.CreateProduct;
using OnlineStoreOrders.Domain.Entities;
using OnlineStoreOrders.Domain.Interfaces;

namespace OnlineStoreOrders.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _readRepo;
        private readonly IProductWriteRepository _writeRepo;
        private readonly IMediator _mediator;

        public ProductsController(IMediator mediator, IProductRepository readRepo, IProductWriteRepository writeRepo)
        {
            _mediator = mediator;
            _readRepo = readRepo;
            _writeRepo = writeRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _readRepo.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var product = await _readRepo.GetByIdAsync(id);
            return product is null ? NotFound() : Ok(product);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateProductCommand cmd)
        {
            var id = await _mediator.Send(cmd);
            return CreatedAtAction(nameof(Get), new { id }, id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Product product)
        {
            if (id != product.Id)
                return BadRequest("ID mismatch.");

            await _writeRepo.UpdateAsync(product);
            return Ok(product);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _writeRepo.DeleteAsync(id);
            return NoContent(); 
        }

    }
}
